# collektor project

This project uses Quarkus, the Supersonic Subatomic Java Framework.

If you want to learn more about Quarkus, please visit its website: https://quarkus.io/ .

## Running the application in dev mode

You can run your application in dev mode that enables live coding using:
```shell script
./mvnw compile quarkus:dev -Dcollektor.base-dir=$PWD/data
```

## Packaging and running the application

The application can be packaged using:
```shell script
MAVEN_OPTS="--enable-preview" ./mvnw package
```
It produces the `collektor-1.0.0-SNAPSHOT-runner.jar` file in the `/target` directory.

The application is now runnable using `java -jar target/collektor-1.0.0-SNAPSHOT-runner.jar`.
