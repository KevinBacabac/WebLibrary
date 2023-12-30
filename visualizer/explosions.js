// Fixed graphic variable
EXPLOSIONS_HD = [];

for (var i = 0; i < 15; i++) {
  EXPLOSIONS_HD.push(new Image());
  EXPLOSIONS_HD[i].src = `https://kevinbacabac.github.io/WebLibrary/images/explosionsHD/${i + 1}.png`;
}

function drawExplosionImage(frame, x, y) {
  var img;
  img = this.EXPLOSIONS_HD[frame];

  // Get x,y equivalent coordinates on the image variable
  var centerX = img.width / 2;
  var centerY = img.height / 2;

  // Get the top-left on the image variable
  var sourceX = Math.round(centerX - x);
  var sourceY = Math.round(centerY - y);

  var sourceWidth = w;
  var sourceHeight = h;

  var destX = 0;
  var destY = 0;
  var destWidth = w;
  var destHeight = h;

  ctx.drawImage(img, sourceX, sourceY, sourceWidth, sourceHeight,
    destX, destY, destWidth, destHeight);
}


class Explosion {
  constructor(x, y, frame = EXPLOSIONS_HD.length - 1) {
    this.toBeRemoved = false;
    this.x = x;
    this.y = y;
    this.frame = frame;

    const EXPLOSION_TYPES = ['Linear', 'Quadratic', 'None', 'sqrt'];
    var i = randint(0, EXPLOSION_TYPES.length - 1);
    this.type = EXPLOSION_TYPES[i];
  }

  draw(ctx, dTime) {
    var percentage = this.frame / EXPLOSIONS_HD.length;
    // Make global alpha start at 100% and drop linearly to 0% while moving through frames
    if (this.type == 'Linear') {
      ctx.globalAlpha = percentage;
    } else if (this.type == 'Quadratic') {
      // Quadratic y=-x^2 + 1
      ctx.globalAlpha = -Math.pow(percentage, 2) + 1;
    } else if (this.type == 'None') {
      // No fade out via alpha
      ctx.globalAlpha = 1;
    } else if (this.type == 'sqrt') {
      // Sqrt
      ctx.globalAlpha = Math.sqrt(-(percentage - 1))
    }

    var frame = Math.round(this.frame);
    drawExplosionImage(frame, this.x, this.y);

    ctx.globalAlpha = 1;
    this.frame -= 20 * dTime;
  }
}

class Explosions {
  constructor() {
    this.particles = [];
  }

  add(x, y, frame) {
    if (explosionsOn) {
      this.particles.push(new Explosion(x, y, frame));
    }
  }

  addR(rect) {
    this.particles.push(new Explosion(...rect.center()));
  }

  clear() {
    this.particles = [];
  }

  draw(...args) {
    for (var particle of this.particles) {
      particle.draw(...args);

      if (particle.frame < 0) {
        particle.toBeRemoved = true;
      }
    }

    this.particles = this.particles.filter(i => !i.toBeRemoved);
  }
}
