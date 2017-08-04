import StringIO
from PIL import Image
im1 = Image.open('001_Fish-Wallpaper-HD.jpg')

# here, we create an empty string buffer
buffer = StringIO.StringIO()
im1.save(buffer, "JPEG", quality=10)

# ... do something else ...

# write the buffer to a file to make sure it worked
with open("./photo-quality10.jpg", "w") as handle:
    handle.write(buffer.contents())
