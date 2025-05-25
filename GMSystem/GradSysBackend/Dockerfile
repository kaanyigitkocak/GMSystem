# Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy solution file and project files for better layer caching
COPY *.sln ./
COPY src/gradProject/WebAPI/*.csproj ./src/gradProject/WebAPI/
COPY src/gradProject/Application/*.csproj ./src/gradProject/Application/
COPY src/gradProject/Domain/*.csproj ./src/gradProject/Domain/
COPY src/gradProject/Infrastructure/*.csproj ./src/gradProject/Infrastructure/
COPY src/gradProject/Persistence/*.csproj ./src/gradProject/Persistence/
COPY tests/StarterProject.Application.Tests/*.csproj ./tests/StarterProject.Application.Tests/

# Restore dependencies
RUN dotnet restore

# Copy all source code
COPY . ./

# Build and publish the WebAPI project
RUN dotnet publish src/gradProject/WebAPI/WebAPI.csproj -c Release -o out --no-restore

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app

# Copy published output from build stage
COPY --from=build /app/out ./

# Expose port (ASP.NET Core default port)
EXPOSE 8080

# Set environment variables
ENV ASPNETCORE_URLS=http://+:8080
ENV ASPNETCORE_ENVIRONMENT=Production

# Set the entry point
ENTRYPOINT ["dotnet", "WebAPI.dll"] 