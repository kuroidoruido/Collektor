package nf.fr.k49.collektor.storage.deserializers;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.google.gson.Gson;
import com.google.gson.JsonDeserializationContext;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParseException;

import nf.fr.k49.collektor.model.CollektionItem;
import nf.fr.k49.shielddb.gson.JsonListDeserializer;

public class CollektionItemDeserializer implements JsonListDeserializer<CollektionItem> {

    private Gson gson;

    public CollektionItemDeserializer() {
        this.gson = new Gson();
    }

    @Override
    public CollektionItem deserializeOne(JsonElement json, JsonDeserializationContext context)
            throws JsonParseException {
        final JsonObject obj = json.getAsJsonObject();
        final String id = obj.get("id").getAsString();
        final String label = obj.get("label").getAsString();
        final List<String> photoUrls = new ArrayList<>();
        obj.get("photoUrls").getAsJsonArray().forEach(url -> {
            photoUrls.add(url.getAsString());
        });
        final Map<String, Object> customFields = this.gson.fromJson(obj.get("customFields"), Map.class);
        return new CollektionItem(id, label, photoUrls, customFields);
    }

}