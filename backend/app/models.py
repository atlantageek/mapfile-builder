from sqlalchemy import Column, Integer, String,ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, DeclarativeBase,relationship

class Base(DeclarativeBase):
    pass

class Mapping(Base):
    __tablename__ = "mappings"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column()
    description: Mapped[str]=mapped_column()
    group_layers: Mapped[list["GroupLayer"]] = relationship(back_populates="mapping")


class GroupLayer(Base):
    __tablename__ = "group_layers"

    id: Mapped[int] = mapped_column(primary_key=True)
    mapping_id: Mapped[int] = mapped_column(ForeignKey("mappings.id"))
    mapping: Mapped["Mapping"] = relationship(back_populates="group_layers")
    layer_name: Mapped[str] =mapped_column(String(100))