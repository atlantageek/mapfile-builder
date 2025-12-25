def to_mapfile(mapfile):
    lines = []
    lines.append(f"MAP")
    lines.append(f"  NAME \"{mapfile.name}\"")
    lines.append(f"  EXTENT {mapfile.extent[0]} {mapfile.extent[1]} {mapfile.extent[2]} {mapfile.extent[3]}")
    lines.append(f"  SIZE {mapfile.size[0]} {mapfile.size[1]}")

    for layer in mapfile.layers:
        lines.append(f"  LAYER")
        lines.append(f"    NAME \"{layer.name}\"")
        lines.append(f"    TYPE {layer.type.upper()}")
        if layer.data:
            lines.append(f"    DATA \"{layer.data}\"")

        for cls in layer.classes:
            lines.append(f"    CLASS")
            if cls.name:
                lines.append(f"      NAME \"{cls.name}\"")
            if cls.style:
                lines.append(f"      STYLE")
                if cls.style.color:
                    lines.append(f"        COLOR {cls.style.color[0]} {cls.style.color[1]} {cls.style.color[2]}")
                if cls.style.outlinecolor:
                    lines.append(f"        OUTLINECOLOR {cls.style.outlinecolor[0]} {cls.style.outlinecolor[1]} {cls.style.outlinecolor[2]}")
                lines.append(f"      END")
            lines.append(f"    END")

        lines.append(f"  END")

    lines.append("END")
    return "\n".join(lines)

