package nf.fr.k49.collektor.storage;

import java.io.IOException;
import java.lang.reflect.Type;
import java.nio.file.Paths;
import java.util.List;

import javax.inject.Singleton;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import nf.fr.k49.collektor.AppConfig;
import nf.fr.k49.collektor.model.Collektion;
import nf.fr.k49.collektor.storage.deserializers.CollektionDeserializer;
import nf.fr.k49.shielddb.core.ShieldDB;
import nf.fr.k49.shielddb.core.storage.FileStorage;
import nf.fr.k49.shielddb.gson.GsonTypeUtils;
import nf.fr.k49.shielddb.gson.ShieldDBGson;

@Singleton
public class CollektionsShieldDBStorage implements CollektionsStorage {
    private static final String FILE_NAME = "Collektions.json";

    private AppConfig config;
    private List<Collektion> collections;

    public CollektionsShieldDBStorage(AppConfig config) throws IOException {
        this.config = config;
    }

    private synchronized List<Collektion> getShieldDbInstance() throws IOException {
        if(this.collections == null) {
            var collektionJsonPath = Paths.get(config.getBaseDir(), FILE_NAME).toAbsolutePath().toString();
            Type type = GsonTypeUtils.getType();
		    Gson gson = new GsonBuilder()
				.setPrettyPrinting()
				.registerTypeAdapter(type, new CollektionDeserializer())
				.create();
            this.collections = ShieldDB.<Collektion>builder()
                    .mapper(new ShieldDBGson<Collektion>(gson,type))
                    .storage(new FileStorage(collektionJsonPath)).build();
            System.out.println("Collekton.json path: "+collektionJsonPath);
        }
        return this.collections;
    }

    public List<Collektion> getCollektions() {
        try {
            return this.getShieldDbInstance();
        } catch (IOException e) {
            e.printStackTrace();
            return List.of();
        }
    }
}
