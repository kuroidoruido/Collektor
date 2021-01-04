package nf.fr.k49.collektor.model;

import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonAutoDetect;

@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public record CollektionItem(
    String id,
    String label,
    List<String> photoUrls,
    Map<String, Object> customFields
) {};

