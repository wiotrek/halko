FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 5000

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY ["Api/Api.csproj", "Api/"]
COPY ["Core/Core.csproj", "Core/"]
COPY ["Infrastructure/Infrastructure.csproj", "Infrastructure/"]

RUN mkdir /tmp/build/
COPY . /tmp/build
RUN find /tmp/build -name *.csproj

RUN dotnet restore "Api/Api.csproj" --verbosity detailed
COPY . .
WORKDIR "/src/Api/"
RUN dotnet build "Api.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "Api.csproj" -c Release -o /app 

FROM base AS final
WORKDIR /app

VOLUME /db-data

COPY --from=publish /app .
ENTRYPOINT ["dotnet", "Api.dll"]