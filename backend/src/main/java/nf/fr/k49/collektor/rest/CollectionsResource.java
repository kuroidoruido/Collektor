package nf.fr.k49.collektor.rest;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.POST;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.jboss.resteasy.annotations.jaxrs.PathParam;

import nf.fr.k49.collektor.model.*;
import nf.fr.k49.collektor.storage.CollektionsStorage;

@Path("/api/collections")
public class CollectionsResource {

    private CollektionsStorage storage;

    public CollectionsResource(CollektionsStorage storage) {
        this.storage = storage;
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
        if(this.storage.getCollektions().add(oneWithGeneratedId)) {
            return Optional.of(oneWithGeneratedId);
        }
        return Optional.empty();
    }
}