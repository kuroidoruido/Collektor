package nf.fr.k49.collektor.storage;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import nf.fr.k49.shielddb.core.json.ShieldDBJsonMapper;

public class JacksonShieldDBJsonMapper<T> implements ShieldDBJsonMapper<T> {

    private final ObjectMapper objectMapper;

    public JacksonShieldDBJsonMapper() {
        this(new ObjectMapper());
    }

    public JacksonShieldDBJsonMapper(ObjectMapper mapper) {
        this.objectMapper = mapper;
    }

    @Override
    public List<T> toList(String json) {
        if (json == null || json.length() == 0) {
            return new ArrayList<>();
        }
        try {
            return new ArrayList<T>(readValueAsList(json));
        } catch (Exception e) {
            e.printStackTrace();
            return new ArrayList<T>();
        }
    }

    @SuppressWarnings("unchecked")
    private Collection<? extends T> readValueAsList(String json) throws JsonMappingException, JsonProcessingException {
        return this.objectMapper.readValue(json, List.class);
    }

    @Override
    public String toJson(List<T> list) {
        try {
            return this.objectMapper.writeValueAsString(list);
        } catch(Exception e) {
            e.printStackTrace();
            return "";
        }
    }
    
}
