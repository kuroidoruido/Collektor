package nf.fr.k49.collektor.storage;

import java.io.IOException;
import java.lang.reflect.Type;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Singleton;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import nf.fr.k49.collektor.AppConfig;
import nf.fr.k49.collektor.model.CollektionItem;
import nf.fr.k49.collektor.storage.deserializers.CollektionItemDeserializer;
import nf.fr.k49.shielddb.core.ShieldDB;
import nf.fr.k49.shielddb.core.storage.FileStorage;
import nf.fr.k49.shielddb.gson.GsonTypeUtils;
import nf.fr.k49.shielddb.gson.ShieldDBGson;

@Singleton
public class CollektionItemsShieldDBStorage implements CollektionItemsStorage {
    private static final String FILE_NAME_SUFFIX = ".json";
    private static final String ITEM_DIR_NAME = "items";

    private AppConfig config;
    private Map<String, List<CollektionItem>> items;

    public CollektionItemsShieldDBStorage(AppConfig config) throws IOException {
        this.config = config;
        this.items = new HashMap<>();
    }

    private synchronized List<CollektionItem> getShieldDbInstance(String collectionId) throws IOException {
        if (!this.items.containsKey(collectionId)) {
            var itemsJsonPath = Paths.get(config.getBaseDir(), ITEM_DIR_NAME, collectionId+FILE_NAME_SUFFIX).toAbsolutePath().toString();
            Type type = GsonTypeUtils.getType();
		    Gson gson = new GsonBuilder()
				.setPrettyPrinting()
				.registerTypeAdapter(type, new CollektionItemDeserializer())
				.create();
            this.items.put(
                collectionId,
                ShieldDB.<CollektionItem>builder()
                    .mapper(new ShieldDBGson<CollektionItem>(gson,type))
                    .storage(new FileStorage(itemsJsonPath)).build()
            );
        }
        return this.items.get(collectionId);
    }

    public List<CollektionItem> getItems(String collectionId) {
        try {
            return this.getShieldDbInstance(collectionId);
        } catch (IOException e) {
            e.printStackTrace();
            return List.of();
        }
    }

}
