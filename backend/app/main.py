from fastapi import FastAPI,Depends
from fastapi.middleware.cors import CORSMiddleware
from app.schemas.mapfile_schema import MapFile
from app.converters.mapfile_converter import to_mapfile
from sqlalchemy.orm import Session
from app.dependencies import get_db
from app.models import MapFile 
from app.schemas.mapfile_schema import MapFileCreate, MapFileRead
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/mapfile/{name}")
def read_mapfile(db:Session = Depends(get_db),name: str = ""):
    return db.query(MapFile).filter(MapFile.name == name).first()

@app.get("/mapfiles")
def read_mapfiles(db:Session = Depends(get_db)):
    return db.query(MapFile).all()

@app.post("/mapfile")
def create_mapfile(mapfile_create: MapFileCreate, db:Session = Depends(get_db)):
    mapfile_obj = MapFile(
        name=mapfile_create.name,
        description=mapfile_create.description,
        x_min=mapfile_create.x_min,
        y_min=mapfile_create.y_min,
        x_max=mapfile_create.x_max,
        y_max=mapfile_create.y_max
    )
    db.add(mapfile_obj)
    db.commit()
    db.refresh(mapfile_obj)

    return {"message": "MapFile received", "mapfile": mapfile_create}


# @app.post("/generate")
# def generate_mapfile(mapfile: MapFile):
#     result = to_mapfile(mapfile)
#     return {"mapfile": result}

