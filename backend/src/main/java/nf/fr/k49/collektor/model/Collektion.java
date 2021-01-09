package nf.fr.k49.collektor.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonAutoDetect;

@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public record Collektion(
    String id,
    String label,
    String imgUrl,
    List<CollektionItemField> customFields
) {
    public Collektion setId(String newId) {
        return new Collektion(newId, this.label(), this.imgUrl(), this.customFields());
    }
};
