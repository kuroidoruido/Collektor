package nf.fr.k49.collektor.rest;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.Response;

import org.jboss.resteasy.annotations.jaxrs.PathParam;
import org.jboss.resteasy.plugins.providers.multipart.InputPart;
import org.jboss.resteasy.plugins.providers.multipart.MultipartFormDataInput;

import nf.fr.k49.collektor.model.ImageInfo;
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

    @DELETE
    @Path("{imageId}")
    public Response deleteOne(@PathParam String imageId) {
        var res = this.storage.deleteImage(imageId);
        if(res.isEmpty()) {
            return Response.status(404).build();
        } else if (res.get()) {
            return Response.ok().build();
        } else {
            return Response.status(500).build();
        }
    }

    @POST
    @Consumes("multipart/form-data")
    public Optional<List<ImageInfo>> postOne(MultipartFormDataInput input) {
        Map<String, List<InputPart>> uploadForm = input.getFormDataMap();
        List<InputPart> inputParts = uploadForm.get("images");
        
        var imgInfos = new ArrayList<ImageInfo>(inputParts.size());
        for (InputPart inputPart : inputParts) {
         try {
            MultivaluedMap<String, String> header = inputPart.getHeaders();
            var fileName = getFileName(header);
            InputStream inputStream = inputPart.getBody(InputStream.class, null);
            this.storage.createImage(inputStream, fileName).stream().forEach(imgInfos::add);
          } catch (IOException e) {
            e.printStackTrace();
          }
        }
        if (imgInfos.size() > 0) {
            return Optional.of(imgInfos);
        } else {
            return Optional.empty();
        }
    }

    /**
     * header sample
     * {
     * 	Content-Type=[image/png], 
     * 	Content-Disposition=[form-data; name="file"; filename="filename.extension"]
     * }
     **/
    private String getFileName(MultivaluedMap<String, String> header) {

        String[] contentDisposition = header.getFirst("Content-Disposition").split(";");
        
        for (String filename : contentDisposition) {
            if ((filename.trim().startsWith("filename"))) {

                String[] name = filename.split("=");
                
                String finalFileName = name[1].trim().replaceAll("\"", "");
                return finalFileName;
            }
        }
        return "unknown";
    }
}