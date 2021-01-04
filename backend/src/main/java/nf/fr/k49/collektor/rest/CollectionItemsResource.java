package nf.fr.k49.collektor.rest;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
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
        var oneWithGeneratedId = new CollektionItem(UUID.randomUUID().toString(), one.label(), one.photoUrls(), one.customFields());
        if (this.storage.getItems(collectionId).add(oneWithGeneratedId)) {
            return Optional.of(oneWithGeneratedId);
        } else {
            return Optional.empty();
        }
    }
}