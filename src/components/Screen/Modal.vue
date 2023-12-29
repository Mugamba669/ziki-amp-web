<template>
    <div ref="th"></div>
</template>
<script>
import * as THREE from 'three'
export default {
    name:"Model",
   
    data() {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,0.5,1000);
        const renderer = new THREE.WebGLRenderer({antialias:true});
        const boxGeo = new THREE.BoxGeometry(3,3,3);
        const boxMaterial = new THREE.MeshNormalMaterial();
        const box = new THREE.Mesh(boxGeo,boxMaterial);
        /** Sphere */
      
        /***Loading textures or images */
        return{
            scene:scene,
            camera:camera,
            renderer:renderer,
            boxGeo:boxGeo,
            boxMaterial:boxMaterial,
            box:box,
        }

    },
      mounted() {
          console.log(this.$refs['th'])
            this.$refs['th'].appendChild(this.renderer.domElement);
            this.animate();
            window.onresize = _=> this.onResize();
            // console.log(this.camera)
        },
    methods: {
            animate(){
                requestAnimationFrame(this.animate)
                  this.renderer.render(this.scene,this.camera);
                //   this.box.rotation.z += 0.01;
                //   this.sphere.rotation.z += 0.01
            },
            onResize() {
                this.camera.aspect = (window.innerWidth /  window.innerHeight);
                this.camera.updateProjectionMatrix();
                this.renderer.setSize((window.innerWidth/2),(window.innerHeight / 2));
                }
        },
         created() {
                this.camera.position.x = -10;
                this.camera.position.y = 3;
                this.camera.position.z = 2;
                this.camera.lookAt(this.scene.position)
                 this.renderer.setSize(window.innerWidth /2,window.innerHeight / 2);
                this.scene.add(this.box);
                console.log(this.box)
            },
}
</script>
<style lang="scss">
    .three{
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        position: fixed;
    }
</style>