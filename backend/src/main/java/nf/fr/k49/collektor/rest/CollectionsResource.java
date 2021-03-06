package nf.fr.k49.collektor.rest;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.jboss.resteasy.annotations.jaxrs.PathParam;

import nf.fr.k49.collektor.model.*;
import nf.fr.k49.collektor.storage.CollektionItemsStorage;
import nf.fr.k49.collektor.storage.CollektionsStorage;

@Path("/api/collections")
public class CollectionsResource {

    private CollektionsStorage storage;
    private CollektionItemsStorage itemStorage;

    public CollectionsResource(CollektionsStorage storage, CollektionItemsStorage itemStorage) {
        this.storage = storage;
        this.itemStorage = itemStorage;
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Collektion> getAll() {
        return this.storage.getCollektions();
    }

    @GET
    @Path("{collectionId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Optional<Collektion> getOne(@PathParam String collectionId) {
        return this.storage.getCollektions().stream().filter(c -> c.id().equals(collectionId)).findAny();
    }

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Optional<Collektion> addOne(Collektion one) {
        var oneWithGeneratedId = one.setId(UUID.randomUUID().toString());
        if (this.storage.getCollektions().add(oneWithGeneratedId)) {
            this.storage.getCollektions().sort(Comparator.comparing(Collektion::id));
            return Optional.of(oneWithGeneratedId);
        }
        return Optional.empty();
    }

    @PUT
    @Produces(MediaType.APPLICATION_JSON)
    public Response editOne(Collektion one) {
        Optional<Integer> index = Optional.empty();
        var collektions = this.storage.getCollektions();
        for (var i = 0; i < collektions.size(); i++) {
            var elt = collektions.get(i);
            if (elt.id().equals(one.id())) {
                index = Optional.of(i);
                break;
            }
        }
        if (!index.isEmpty()) {
            var allDeleted = index.stream()
                .map(i -> this.storage.getCollektions().remove(i.intValue()))
                .map(deleted -> deleted != null)
                .reduce(Boolean::logicalOr);
            if (allDeleted.isPresent() && allDeleted.get()) {
                if (this.storage.getCollektions().add(one)) {
                    this.storage.getCollektions().sort(Comparator.comparing(Collektion::id));
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

    @DELETE
    @Path("{collectionId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteOne(@PathParam String collectionId) {
        Optional<Integer> index = Optional.empty();
        var collektions = this.storage.getCollektions();
        for (var i = 0; i < collektions.size(); i++) {
            var elt = collektions.get(i);
            if (elt.id().equals(collectionId)) {
                index = Optional.of(i);
                break;
            }
        }
        if (!index.isEmpty()) {
            if (this.itemStorage.deleteStorage(collectionId)) {
                var allDeleted = index.stream()
                    .map(i -> this.storage.getCollektions().remove(i.intValue()))
                    .map(deleted -> deleted != null)
                    .reduce(Boolean::logicalOr);
                if (allDeleted.isPresent() && allDeleted.get()) {
                    return Response.ok().build();
                } else {
                    return Response.status(404).build();
                }
            } else {
                return Response.status(500).build();
            }
        } else {
            return Response.status(404).build();
        }
    }
}