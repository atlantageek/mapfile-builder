from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from app.schemas.mapfile_schema import MapFile
from app.converters.mapfile_converter import to_mapfile
from sqlalchemy.orm import Session
from app.dependencies import get_db
from app.models import Mapping, GroupLayer
from app.schemas.mapfile_schema import MappingRead,MappingCreate,GroupLayerCreate,GroupLayerRead

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)
#/mappings endpoints
@app.get("/mappings")
def read_mappings(db:Session = Depends(get_db)):
    return db.query(Mapping).all()


@app.post("/mappings")
def create_mapping(mapping_create: MappingCreate, db:Session = Depends(get_db)):
    mapping = Mapping(name=mapping_create.name, description=mapping_create.description)
    db.add(mapping)
    db.commit()
    db.refresh(mapping)
    return mapping

#/group_layers endpoints
@app.get("/group_layers/{mapping_id}")
def read_mappings(db:Session = Depends(get_db), mapping_id: int = None):
    mapping = db.query(Mapping).filter(Mapping.id == mapping_id).first()
    group_layers = mapping.group_layers
    return group_layers


@app.post("/group_layers")
def create_mapping(group_layer_create: GroupLayerCreate, db:Session = Depends(get_db)):
    mapping = db.query(Mapping).filter(Mapping.id == group_layer_create.mapping_id).first()
    group_layer= GroupLayer(mapping_id=group_layer_create.mapping_id, layer_name=group_layer_create.layer_name)
    db.add(group_layer)
    db.commit()
    db.refresh(group_layer)
    return group_layer

#/generate endpoint
@app.post("/generate")
def generate_mapfile(mapfile: MapFile):
    result = to_mapfile(mapfile)
    return {"mapfile": result}

