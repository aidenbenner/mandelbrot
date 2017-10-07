var canvas = document.getElementById('can'); 
var ctx = canvas.getContext('2d');
// ctx.globalCompositeOperation = "multiply";

var xmax = canvas.width = window.innerWidth; 
var ymax = canvas.height = window.innerHeight; 

var iterations = 20

function complex(a,b) {
  var c = {} 
  c.a = a 
  c.b = b
  c.magnitude = function() {
    return Math.sqrt(c.a * c.a + c.b * c.b)  
  }
  c.magSquared = function() {
    return c.a * c.a + c.b * c.b
  }
  c.square = function() {
    return complex(c.a * c.a - c.b * c.b, 2 * c.a * c.b)
  }
  c.add = function(comp) {
    return complex(c.a + comp.a,  c.b + comp.b)
  }
  return c
}

function mandel(a, b){
  c = complex(a,b) 
  z = complex(0,0)
  for(var i = 0; i< iterations; i++){
    z = z.square() 
    z = z.add(c)
    if(z.magSquared() >= 25) return i
  }
  return iterations 
}

var c = complex(1,5) 
console.log(c.square().add(complex(1,1)))

console.log(mandel(-1,0))

function toRgb(r, g, b){
  return "rgb(" + Math.round(r) + "," + Math.round(g) + "," + Math.round(b) + ")"
}

function drawSet() {
  var xMin = -2.5; 
  var xMax = 1.5; 
  var yMin = -1.5; 
  var yMax = 1.5; 
  var xRange = Math.abs(xMin) + Math.abs(xMax)
  var yRange = Math.abs(yMin) + Math.abs(yMax)

  for(var i = 0; i<canvas.width;  i += 1){
    for(var k = 0; k<canvas.height; k += 1){
      var a = (i / canvas.width) * xRange + xMin
      var b = (k / canvas.height) * yRange + yMin 
      var itr = mandel(a,b)
      if(itr == iterations){
        ctx.fillStyle = '#000000'; 
      }
      else{
        var expo = 3 
        var r = 255 - Math.pow(itr / iterations, expo) * 100 
        var g = 255 - Math.pow(itr / iterations, expo) * 255 
        var b = 255 - Math.pow(itr / iterations, expo) * 255

        ctx.fillStyle = toRgb(r,g,b); 
      }
      ctx.fillRect(i,k,1,1)
    }
  }
}

console.log(mandel(-5,0))
console.log(mandel(-1,0.5))

drawSet()
