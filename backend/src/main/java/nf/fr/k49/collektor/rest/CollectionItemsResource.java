package nf.fr.k49.collektor.rest;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.jboss.resteasy.annotations.jaxrs.PathParam;

import nf.fr.k49.collektor.model.CollektionItem;
import nf.fr.k49.collektor.storage.CollektionItemsStorage;

@Path("/api/collections/{collectionId}/items")
public class CollectionItemsResource {

    private CollektionItemsStorage storage;

    public CollectionItemsResource(CollektionItemsStorage storage) {
        this.storage = storage;
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Optional<List<CollektionItem>> getAll(@PathParam String collectionId) {
        return Optional.ofNullable(this.storage.getItems(collectionId));
    }

    @GET
    @Path("{itemId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Optional<CollektionItem> getOne(@PathParam String collectionId, @PathParam String itemId) {
        return this.storage.getItems(collectionId).stream().filter(item -> item.id().equals(itemId)).findAny();
    }

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Optional<CollektionItem> addOne(@PathParam String collectionId, CollektionItem one) {
        var oneWithGeneratedId = one.setId(UUID.randomUUID().toString());
        if (this.storage.getItems(collectionId).add(oneWithGeneratedId)) {
            return Optional.of(oneWithGeneratedId);
        } else {
            return Optional.empty();
        }
    }

    @PUT
    @Produces(MediaType.APPLICATION_JSON)
    public Response editOne(@PathParam String collectionId, CollektionItem one) {
        Optional<Integer> index = Optional.empty();
        var items = this.storage.getItems(collectionId);
        for (var i = 0; i < items.size(); i++) {
            var elt = items.get(i);
            if(elt.id().equals(one.id())) {
                index = Optional.of(i);
                break;
            }
        }
        if(!index.isEmpty()) {
            var allDeleted = index.stream()
                .map(i -> this.storage.getItems(collectionId).remove(i.intValue()))
                .map(deleted -> deleted != null)
                .reduce(Boolean::logicalOr);
            if(allDeleted.isPresent() && allDeleted.get()) {
                if(this.storage.getItems(collectionId).add(one)) {
                    return Response.ok(one).build();
                } else {
                    return Response.status(500).build();
                }
            } else {
                return Response.status(404).build();
            }
        } else {
            return Response.status(404).build();
        }
    }
}