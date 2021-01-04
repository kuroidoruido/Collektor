package nf.fr.k49.collektor.storage.deserializers;

import java.util.ArrayList;
import java.util.List;

import com.google.gson.JsonDeserializationContext;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParseException;

import nf.fr.k49.collektor.model.Collektion;
import nf.fr.k49.collektor.model.CollektionItemField;
import nf.fr.k49.collektor.model.CollektionItemFieldType;
import nf.fr.k49.shielddb.gson.JsonListDeserializer;

public class CollektionDeserializer implements JsonListDeserializer<Collektion> {

    @Override
    public Collektion deserializeOne(JsonElement json, JsonDeserializationContext context) throws JsonParseException {
        final JsonObject obj = json.getAsJsonObject();
        final String id = obj.get("id").getAsString();
        final String label = obj.get("label").getAsString();
        final List<CollektionItemField> customFields = new ArrayList<CollektionItemField>();
        obj.get("customFields").getAsJsonArray().forEach(field -> {
            final JsonObject fieldObj = field.getAsJsonObject();
            final String fieldKey = fieldObj.get("key").getAsString();
            final String fieldLabel = fieldObj.get("label").getAsString();
            final String fieldTypeStr = fieldObj.get("type").getAsString();
            final CollektionItemFieldType fieldType = stringToItemFieldType(fieldTypeStr);
            customFields.add(new CollektionItemField(fieldKey, fieldLabel, fieldType));
        });
        return new Collektion(id, label, customFields);
    }

    private static CollektionItemFieldType stringToItemFieldType(String fieldTypeStr) {
        return switch(fieldTypeStr) {
            case "BOOLEAN" -> CollektionItemFieldType.BOOLEAN;
            case "INTEGER" -> CollektionItemFieldType.INTEGER;
            case "DATE" -> CollektionItemFieldType.DATE;
            default -> CollektionItemFieldType.TEXT;
        };
    }
}