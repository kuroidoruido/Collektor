package nf.fr.k49.collektor.storage;

import java.util.List;

import nf.fr.k49.collektor.model.CollektionItem;

public interface CollektionItemsStorage {
    public List<CollektionItem> getItems(String collectionId);
}
