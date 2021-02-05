package nf.fr.k49.collektor.storage;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Optional;
import java.util.UUID;

import javax.inject.Singleton;

import org.apache.commons.io.IOUtils;

import nf.fr.k49.collektor.AppConfig;
import nf.fr.k49.collektor.model.ImageInfo;

@Singleton
public class ImagesFileStorage implements ImagesStorage {
    private static final String IMG_DIR_NAME = "imgs";

    AppConfig config;

    public ImagesFileStorage(AppConfig config) {
        this.config = config;
    }

    public Optional<File> getImage(String imageId) {
        var imgDirPath = Paths.get(this.config.getBaseDir(), IMG_DIR_NAME);
        var imgDir = imgDirPath.toFile();
        var fileNames = imgDir.list((File dir, String name) -> name != null && name.startsWith(imageId));
        if (fileNames != null && fileNames.length >= 1) {
            return Optional.ofNullable(Paths.get(imgDirPath.toString(), fileNames[0]).toFile());
        }
        return Optional.empty();
    }

    public Optional<Boolean> deleteImage(String imageId) {
        var imgDirPath = Paths.get(this.config.getBaseDir(), IMG_DIR_NAME);
        var imgDir = imgDirPath.toFile();
        var fileNames = imgDir.list((File dir, String name) -> name != null && name.startsWith(imageId));
        if (fileNames != null && fileNames.length >= 1) {
            if (Paths.get(imgDirPath.toString(), fileNames[0]).toFile().delete()) {
                return Optional.of(true);
            } else {
                return Optional.of(false);
            }
        }
        return Optional.empty();
    }

    @Override
    public Optional<ImageInfo> createImage(InputStream fileInputStream, String filename) {
        try {
            byte[] bytes = IOUtils.toByteArray(fileInputStream);
            var fileExtension = filename.contains(".") ? filename.split("\\.")[1] : "";
            var fileUuid = UUID.randomUUID().toString();
            var filePath = Paths.get(this.config.getBaseDir(), IMG_DIR_NAME, fileUuid+"."+fileExtension);
            var filePath = Paths.get(this.config.baseDir, IMG_DIR_NAME, fileUuid+"."+fileExtension);
            Files.write(filePath, bytes);
            return Optional.of(new ImageInfo(fileUuid, "/api/imgs/"+fileUuid));
        } catch(IOException e) {
            e.printStackTrace();
            return Optional.empty();
        }
    }
}
