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
    description: Optional[str] = None
    x_min: float
    y_min: float
    x_max: float
    y_max: float

class MapFileCreate(BaseModel):
    name: str
    description: Optional[str] = None
    x_min: float
    y_min: float
    x_max: float
    y_max: float

class MapFileRead(BaseModel):
    id: int
    name: str
    description: Optional[str] = None
    x_min: float
    y_min: float
    x_max: float
    y_max: float