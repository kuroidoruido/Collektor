package nf.fr.k49.collektor;

import javax.inject.Singleton;

import org.eclipse.microprofile.config.inject.ConfigProperty;

@Singleton
public class AppConfig {

    @ConfigProperty(name = "collektor.base-dir", defaultValue = "./data")
    public String baseDir;
    
}
