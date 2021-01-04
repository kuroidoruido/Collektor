package nf.fr.k49.collektor.storage;

import java.io.File;
import java.util.Optional;

public interface ImagesStorage {
    public Optional<File> getImage(String imageId);
}
