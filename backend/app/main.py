from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.schemas.mapfile_schema import MapFile
from app.converters.mapfile_converter import to_mapfile

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/generate")
def generate_mapfile(mapfile: MapFile):
    result = to_mapfile(mapfile)
    return {"mapfile": result}

