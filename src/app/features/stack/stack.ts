import { Component, AfterViewInit, ElementRef, ViewChild, OnDestroy, } from '@angular/core';
import { CommonModule } from '@angular/common';
declare const THREE: any;

@Component({
    selector: 'app-stack',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './stack.html',
    styleUrl: './stack.scss'
})
export class Stack implements AfterViewInit, OnDestroy {
    @ViewChild('stackCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
    private renderer!: any;
    private scene!: any;
    private camera!: any;
    private animationId!: number;
    private icons: any[] = [];

    categories = [
        {
            name: 'Frontend',
            items: [
                { name: 'Angular', icon: 'https://cdn.simpleicons.org/angular/FF2D20' },
                { name: 'HTML5', icon: 'https://cdn.simpleicons.org/html5/E34F26' },
                { name: 'SCSS', icon: 'https://cdn.simpleicons.org/sass/CC6699' },
                { name: 'Bootstrap', icon: 'https://cdn.simpleicons.org/bootstrap/7952B3' },
                { name: 'TypeScript', icon: 'https://cdn.simpleicons.org/typescript/3178C6' },
                { name: 'JavaScript', icon: 'https://cdn.simpleicons.org/javascript/F7DF1E' },
            ],
        },
        {
            name: 'Backend & APIs',
            items: [
                { name: 'Node.js', icon: 'https://cdn.simpleicons.org/nodedotjs/339933' },
                { name: 'NestJS', icon: 'https://cdn.simpleicons.org/nestjs/E0234E' },
                { name: '.NET Core', icon: 'https://cdn.simpleicons.org/dotnet/512BD4' },
                { name: 'Express', icon: 'https://cdn.simpleicons.org/express/FFFFFF' },
                { name: 'JWT', icon: 'https://cdn.simpleicons.org/jsonwebtokens/000000' },
            ],
        },
        {
            name: 'Databases',
            items: [
                { name: 'MySQL', icon: 'https://cdn.simpleicons.org/mysql/4479A1' },
                { name: 'PostgreSQL', icon: 'https://cdn.simpleicons.org/postgresql/336791' },
                { name: 'SQL Server', icon: 'https://cdn.simpleicons.org/microsoftsqlserver/CC2927' },
                { name: 'MongoDB', icon: 'https://cdn.simpleicons.org/mongodb/47A248' },
                { name: 'Firebase', icon: 'https://cdn.simpleicons.org/firebase/FFCA28' },
            ],
        },
        {
            name: 'Dev & Workflows',
            items: [
                { name: 'Git', icon: 'https://cdn.simpleicons.org/git/F05032' },
                { name: 'GitHub', icon: 'https://cdn.simpleicons.org/github/181717' },
                { name: 'Bitbucket', icon: 'https://cdn.simpleicons.org/bitbucket/205081' },
                { name: 'Postman', icon: 'https://cdn.simpleicons.org/postman/FF6C37' },
                { name: 'VS Code', icon: 'https://cdn.simpleicons.org/visualstudiocode/007ACC' },
                { name: 'Jira', icon: 'https://cdn.simpleicons.org/jira/0052CC' },
            ],
        },
        {
            name: 'Data & BI',
            items: [
                { name: 'Python', icon: 'https://cdn.simpleicons.org/python/3776AB' },
                { name: 'Pandas', icon: 'https://cdn.simpleicons.org/pandas/150458' },
                { name: 'Power BI', icon: 'https://cdn.simpleicons.org/powerbi/F2C811' },
                { name: 'Excel', icon: 'https://cdn.simpleicons.org/microsoftexcel/217346' },
            ],
        },
        {
            name: 'Architectures & Methodologies',
            items: [
                { name: 'Clean Architecture', icon: 'https://cdn.simpleicons.org/archlinux/1793D1' },
                { name: 'SOLID', icon: 'https://cdn.simpleicons.org/solidity/363636' },
                { name: 'Scrum', icon: 'https://cdn.simpleicons.org/scrumalliance/009FDA' },
                { name: 'DevOps', icon: 'https://cdn.simpleicons.org/azuredevops/0078D7' },
            ],
        },
    ];

    async ngAfterViewInit() {
        await this.loadThreeJS();
        this.init3DScene();
    }

    ngOnDestroy() {
        cancelAnimationFrame(this.animationId);
        if (this.renderer) this.renderer.dispose();
    }

    private async loadThreeJS(): Promise<void> {
        if ((window as any).THREE) return;
        await new Promise<void>((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://unpkg.com/three@0.152.2/build/three.min.js';
            script.onload = () => resolve();
            script.onerror = (err) => reject(err);
            document.body.appendChild(script);
        });
    }

    private init3DScene() {
        const canvas = this.canvasRef.nativeElement;
        this.renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        this.renderer.setSize(width, height, false);

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x0f111a);

        this.camera = new THREE.PerspectiveCamera(70, width / height, 0.1, 1000);
        this.camera.position.z = 3;

        const light = new THREE.PointLight(0xffffff, 1.4);
        light.position.set(3, 3, 3);
        this.scene.add(light);

        const radius = 1.5;
        const iconCount = this.categories.flatMap(c => c.items).length;
        const allIcons = this.categories.flatMap(c => c.items);

        const loader = new THREE.TextureLoader();
        loader.crossOrigin = 'anonymous';

        allIcons.forEach((tech, i) => {
            loader.load(
                tech.icon,
                (texture: any) => {
                    const phi = Math.acos(-1 + (2 * i) / iconCount);
                    const theta = Math.sqrt(iconCount * Math.PI) * phi;

                    const material = new THREE.SpriteMaterial({ map: texture });
                    const sprite = new THREE.Sprite(material);
                    sprite.position.setFromSphericalCoords(radius, phi, theta);
                    sprite.scale.set(0.35, 0.35, 0.35);
                    this.scene.add(sprite);
                    this.icons.push(sprite);
                },
                undefined,
                () => console.warn(`⚠️ No se pudo cargar el ícono de ${tech.name}`)
            );
        });

        this.animate();
    }

    private animate = () => {
        this.icons.forEach((icon) => {
            icon.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), 0.0025);
            icon.position.applyAxisAngle(new THREE.Vector3(1, 0, 0), 0.001);
        });

        this.renderer.render(this.scene, this.camera);
        this.animationId = requestAnimationFrame(this.animate);
    };
}