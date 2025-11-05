import { Component, AfterViewInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as THREE from 'three';
import { stack } from '../../core/env/data-stack';

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

    private renderer!: THREE.WebGLRenderer;
    private scene!: THREE.Scene;
    private camera!: THREE.PerspectiveCamera;
    private iconsGroup!: THREE.Group;
    private animationId!: number;

    private isDragging = false;
    private previousMousePosition = { x: 0, y: 0 };
    private rotationVelocity = { x: 0, y: 0 };
    private damping = 0.93;

    private baseRotation = { x: 0.0015, y: 0.0025 };

    ngAfterViewInit(): void {
        this.init3DScene();
        this.addMouseControls();
        setTimeout(() => this.animate(), 800);
    }

    ngOnDestroy(): void {
        cancelAnimationFrame(this.animationId);
        if (this.renderer) this.renderer.dispose();
    }

    private init3DScene(): void {
        const canvas = this.canvasRef.nativeElement;
        this.renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });

        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        this.renderer.setSize(width, height, false);

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x0f111a);

        this.camera = new THREE.PerspectiveCamera(70, width / height, 0.1, 1000);
        this.camera.position.z = 3;

        const pointLight = new THREE.PointLight(0xffffff, 1.5);
        pointLight.position.set(3, 3, 3);
        this.scene.add(pointLight);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambientLight);

        this.iconsGroup = new THREE.Group();
        this.scene.add(this.iconsGroup);

        this.loadTechIcons();
    }

    private loadTechIcons(): void {
        const loader = new THREE.TextureLoader();
        const allTechItems = this.techCategories.flatMap(c => c.items);
        const radius = 1.5;

        allTechItems.forEach((tech, i) => {
            loader.load(
                tech.icon,
                (texture) => {
                    texture.colorSpace = THREE.SRGBColorSpace;
                    texture.minFilter = THREE.LinearFilter;
                    texture.magFilter = THREE.LinearFilter;

                    const phi = Math.acos(-1 + (2 * i) / allTechItems.length);
                    const theta = Math.sqrt(allTechItems.length * Math.PI) * phi;

                    const material = new THREE.SpriteMaterial({
                        map: texture,
                        color: 0xffffff,
                        transparent: true,
                        opacity: 1.0
                    });

                    const sprite = new THREE.Sprite(material);
                    sprite.position.setFromSphericalCoords(radius, phi, theta);
                    sprite.scale.set(0.42, 0.42, 0.42);
                    this.iconsGroup.add(sprite);
                }
            );
        });
    }

    private addMouseControls(): void {
        const canvas = this.canvasRef.nativeElement;

        canvas.addEventListener('mousedown', (e) => {
            this.isDragging = true;
            this.previousMousePosition = { x: e.clientX, y: e.clientY };
        });

        canvas.addEventListener('mousemove', (e) => {
            if (!this.isDragging) return;
            const deltaX = e.clientX - this.previousMousePosition.x;
            const deltaY = e.clientY - this.previousMousePosition.y;

            this.rotationVelocity.y = deltaX * 0.005;
            this.rotationVelocity.x = deltaY * 0.005;

            this.previousMousePosition = { x: e.clientX, y: e.clientY };
        });

        window.addEventListener('mouseup', () => {
            this.isDragging = false;
        });
    }

    private animate = (): void => {
        this.iconsGroup.rotation.x += this.baseRotation.x;
        this.iconsGroup.rotation.y += this.baseRotation.y;

        if (!this.isDragging) {
            this.rotationVelocity.x *= this.damping;
            this.rotationVelocity.y *= this.damping;
        }

        this.iconsGroup.rotation.x += this.rotationVelocity.x;
        this.iconsGroup.rotation.y += this.rotationVelocity.y;

        this.renderer.render(this.scene, this.camera);
        this.animationId = requestAnimationFrame(this.animate);
    };
}