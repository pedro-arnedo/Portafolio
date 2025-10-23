import { Component, AfterViewInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { stack } from '../../core/config/data-stack';
declare global {
    interface Window { THREE: any; }
}

@Component({
    selector: 'app-stack',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './stack.html',
    styleUrls: ['./stack.scss']
})
export class Stack implements AfterViewInit, OnDestroy {
    @ViewChild('stackCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
    techCategories = stack.techCategories;

    private renderer!: any;
    private scene!: any;
    private camera!: any;
    private icons: any[] = [];
    private animationId!: number;

    async ngAfterViewInit(): Promise<void> {
        await this.loadThreeJS();
        this.init3DScene();
        setTimeout(() => {
            this.animate();
        }, 800);
    }

    ngOnDestroy(): void {
        cancelAnimationFrame(this.animationId);
        if (this.renderer) this.renderer.dispose();
    }

    private async loadThreeJS(): Promise<void> {
        if (window.THREE) return;
        return new Promise<void>((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://unpkg.com/three@0.152.2/build/three.min.js';
            script.onload = () => resolve();
            script.onerror = reject;
            document.body.appendChild(script);
        });
    }

    private init3DScene(): void {
        const canvas = this.canvasRef.nativeElement;
        this.renderer = new window.THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });

        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        this.renderer.setSize(width, height, false);

        this.scene = new window.THREE.Scene();
        this.scene.background = new window.THREE.Color(0x0f111a);

        this.camera = new window.THREE.PerspectiveCamera(70, width / height, 0.1, 1000);
        this.camera.position.z = 3;

        const light = new window.THREE.PointLight(0xffffff, 1.4);
        light.position.set(3, 3, 3);
        this.scene.add(light);

        this.loadTechIcons();
    }

    private loadTechIcons(): void {
        const loader = new window.THREE.TextureLoader();
        loader.crossOrigin = 'anonymous';

        const allTechItems = this.techCategories.flatMap(c => c.items);
        const radius = 1.5;

        allTechItems.forEach((tech, i) => {
            loader.load(
                tech.icon,
                (texture: any) => {
                    const phi = Math.acos(-1 + (2 * i) / allTechItems.length);
                    const theta = Math.sqrt(allTechItems.length * Math.PI) * phi;

                    const material = new window.THREE.SpriteMaterial({ map: texture });
                    const sprite = new window.THREE.Sprite(material);

                    sprite.position.setFromSphericalCoords(radius, phi, theta);
                    sprite.scale.set(0.35, 0.35, 0.35);

                    this.scene.add(sprite);
                    this.icons.push(sprite);
                }
            );
        });
    }

    private animate = (): void => {
        const axisY = new window.THREE.Vector3(0, 1, 0);
        const axisX = new window.THREE.Vector3(1, 0, 0);

        this.icons.forEach(icon => {
            icon.position.applyAxisAngle(axisY, 0.0025);
            icon.position.applyAxisAngle(axisX, 0.001);
        });

        this.renderer.render(this.scene, this.camera);
        this.animationId = requestAnimationFrame(this.animate);
    };
}