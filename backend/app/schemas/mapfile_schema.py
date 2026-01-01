from pydantic import BaseModel
from typing import List, Optional

class Style(BaseModel):
    color: Optional[List[int]] = None
    outlinecolor: Optional[List[int]] = None

class ClassItem(BaseModel):
    name: Optional[str] = None
    style: Optional[Style] = None

class Layer(BaseModel):
    name: str
    type: str
    data: Optional[str] = None
    classes: Optional[List[ClassItem]] = []

class MapFile(BaseModel):
    name: str
    extent: List[float]
    size: List[int]
    layers: List[Layer]

class MappingCreate(BaseModel):
    name: str
    description: str
    extent: List[float]
    size: List[int]
    

class MappingRead(BaseModel):
    id: int
    name: str
    description: str
    extent: List[float]
    size: List[int]

class Config:
    from_attributes = True   # Pydantic v2 ORM mode

class GroupLayerCreate(BaseModel):
    mapping_id: int
    layer_name: str

class GroupLayerRead(BaseModel):
    id: int
    mapping_id: int
    layer_name: str


