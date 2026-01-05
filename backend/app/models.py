from sqlalchemy import Column, Integer, String,ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, DeclarativeBase,relationship

class Base(DeclarativeBase):
    pass

class MapFile(Base):
    __tablename__ = "mapfiles"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column()
    description: Mapped[str]=mapped_column()
    x_min: Mapped[float] = mapped_column()
    y_min: Mapped[float] = mapped_column()
    x_max: Mapped[float] = mapped_column()
    y_max: Mapped[float] = mapped_column()
