package nf.fr.k49.collektor.rest;

import java.io.IOException;
import java.nio.file.Files;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;

import org.jboss.resteasy.annotations.jaxrs.PathParam;

import nf.fr.k49.collektor.storage.ImagesStorage;

@Path("/api/imgs")
public class ImagesResource {

    private ImagesStorage storage;

    public ImagesResource(ImagesStorage storage) {
        this.storage = storage;
    }

    @GET
    @Path("{imageId}")
    public Response getOne(@PathParam String imageId) throws IOException {
        var imgFile = this.storage.getImage(imageId);
        if (imgFile.isEmpty() ){
            return Response.status(404).build();
        }
        return Response.ok((Object) imgFile.get())
            .header("Content-Disposition", "attachment;filename=" + imgFile.get().getName())
            .header("Content-type", Files.probeContentType(imgFile.get().toPath()))
            .build();
    }
}