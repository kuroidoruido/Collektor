package nf.fr.k49.collektor.model;

import com.fasterxml.jackson.annotation.JsonAutoDetect;

@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public record Collektion(
    String id,
    String label
) {};

