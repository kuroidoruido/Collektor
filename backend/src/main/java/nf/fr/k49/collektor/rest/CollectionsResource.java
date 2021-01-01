package nf.fr.k49.collektor.rest;

import java.util.ArrayList;
import java.util.List;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.POST;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import nf.fr.k49.collektor.model.Collektion;

@Path("/collections")
public class CollectionsResource {

    private static List<Collektion> COLLECTIONS = new ArrayList<>();

    static {
        COLLECTIONS.addAll(List.of(new Collektion("001", "Wonderswan games"), new Collektion("002", "Gameboy Color games")));
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Collektion> getAll() {
        return COLLECTIONS;
    }

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Collektion addOne(Collektion one) {
        COLLECTIONS.add(one);
        return one;
    }
}