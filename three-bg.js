// ==================== THREE.JS 3D SCENE ====================
// Shared 3D background for EngineersPath pages
(function() {
    if (typeof THREE === 'undefined') return;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motionQuery.matches) return;

    const container = document.getElementById('threeBg');
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x06b6d4, 0.3);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x06b6d4, 1.5, 100);
    pointLight1.position.set(15, 15, 15);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xd97706, 0.8, 80);
    pointLight2.position.set(-15, -10, 10);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0x10b981, 0.5, 60);
    pointLight3.position.set(0, 20, -10);
    scene.add(pointLight3);

    // Materials
    const wireMat = new THREE.MeshPhongMaterial({
        color: 0x06b6d4, wireframe: true, transparent: true, opacity: 0.25
    });

    const glassMat = new THREE.MeshPhongMaterial({
        color: 0x06b6d4, transparent: true, opacity: 0.12, shininess: 100, specular: 0x22d3ee
    });

    const amberMat = new THREE.MeshPhongMaterial({
        color: 0xd97706, wireframe: true, transparent: true, opacity: 0.2
    });

    const greenMat = new THREE.MeshPhongMaterial({
        color: 0x10b981, transparent: true, opacity: 0.15, shininess: 80, specular: 0x10b981
    });

    // ===== 3D OBJECTS =====
    const objects = [];

    // 1. Wireframe Cube (big, left)
    const cube1 = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), wireMat);
    cube1.position.set(-14, 5, -5);
    cube1.userData = { basePos: cube1.position.clone(), floatAmp: 2, floatSpeed: 0.5, rotSpeed: { x: 0.005, y: 0.008, z: 0.003 } };
    scene.add(cube1); objects.push(cube1);

    // 2. Solid Cube (small, right)
    const cube2 = new THREE.Mesh(new THREE.BoxGeometry(1.8, 1.8, 1.8), glassMat);
    cube2.position.set(16, -3, -8);
    cube2.userData = { basePos: cube2.position.clone(), floatAmp: 3, floatSpeed: 0.4, rotSpeed: { x: 0.01, y: 0.006, z: 0.004 } };
    scene.add(cube2); objects.push(cube2);

    // 3. Torus (ring, top-right)
    const torus = new THREE.Mesh(new THREE.TorusGeometry(2.5, 0.4, 16, 40), wireMat.clone());
    torus.material.opacity = 0.2;
    torus.position.set(12, 8, -10);
    torus.userData = { basePos: torus.position.clone(), floatAmp: 2.5, floatSpeed: 0.35, rotSpeed: { x: 0.007, y: 0.003, z: 0.005 } };
    scene.add(torus); objects.push(torus);

    // 4. Octahedron (center-left)
    const octa = new THREE.Mesh(new THREE.OctahedronGeometry(2, 0), amberMat);
    octa.position.set(-10, -6, -12);
    octa.userData = { basePos: octa.position.clone(), floatAmp: 2, floatSpeed: 0.45, rotSpeed: { x: 0.004, y: 0.009, z: 0.006 } };
    scene.add(octa); objects.push(octa);

    // 5. Icosahedron (sphere-like, bottom)
    const ico = new THREE.Mesh(new THREE.IcosahedronGeometry(1.5, 0), greenMat);
    ico.position.set(5, -8, -6);
    ico.userData = { basePos: ico.position.clone(), floatAmp: 1.5, floatSpeed: 0.55, rotSpeed: { x: 0.006, y: 0.004, z: 0.008 } };
    scene.add(ico); objects.push(ico);

    // 6. Laptop/Monitor shape
    const monitorGroup = new THREE.Group();
    const screenGeo = new THREE.BoxGeometry(4, 2.8, 0.15);
    const screenMat = new THREE.MeshPhongMaterial({ color: 0x06b6d4, transparent: true, opacity: 0.08, shininess: 150, specular: 0x22d3ee });
    const screen = new THREE.Mesh(screenGeo, screenMat);
    const screenEdges = new THREE.EdgesGeometry(screenGeo);
    screen.add(new THREE.LineSegments(screenEdges, new THREE.LineBasicMaterial({ color: 0x06b6d4, transparent: true, opacity: 0.4 })));
    const glow = new THREE.Mesh(new THREE.PlaneGeometry(3.4, 2.2), new THREE.MeshBasicMaterial({ color: 0x06b6d4, transparent: true, opacity: 0.06 }));
    glow.position.z = 0.08;
    screen.add(glow);
    monitorGroup.add(screen);
    const baseGeo = new THREE.BoxGeometry(4.2, 0.12, 2.5);
    const base = new THREE.Mesh(baseGeo, new THREE.MeshPhongMaterial({ color: 0x0d9488, transparent: true, opacity: 0.1 }));
    base.add(new THREE.LineSegments(new THREE.EdgesGeometry(baseGeo), new THREE.LineBasicMaterial({ color: 0x0d9488, transparent: true, opacity: 0.3 })));
    base.position.set(0, -1.46, 1.2);
    base.rotation.x = -Math.PI / 2 + 0.15;
    monitorGroup.add(base);
    monitorGroup.position.set(-6, 2, -4);
    monitorGroup.rotation.y = 0.3;
    monitorGroup.userData = { basePos: monitorGroup.position.clone(), floatAmp: 1.5, floatSpeed: 0.3, rotSpeed: { x: 0.002, y: 0.004, z: 0.001 } };
    scene.add(monitorGroup); objects.push(monitorGroup);

    // 7. Gear/Cog shape
    const gear = new THREE.Mesh(new THREE.TorusKnotGeometry(1.5, 0.3, 80, 12, 2, 3), wireMat.clone());
    gear.material.opacity = 0.18;
    gear.material.color = new THREE.Color(0x0d9488);
    gear.position.set(8, 4, -15);
    gear.userData = { basePos: gear.position.clone(), floatAmp: 3, floatSpeed: 0.25, rotSpeed: { x: 0.003, y: 0.006, z: 0.002 } };
    scene.add(gear); objects.push(gear);

    // 8. Cone / Prism
    const coneGeo = new THREE.ConeGeometry(1.2, 3, 4);
    const cone = new THREE.Mesh(coneGeo, amberMat.clone());
    cone.material.wireframe = false;
    cone.material.opacity = 0.1;
    cone.add(new THREE.LineSegments(new THREE.EdgesGeometry(coneGeo), new THREE.LineBasicMaterial({ color: 0xd97706, transparent: true, opacity: 0.35 })));
    cone.position.set(-16, -8, -10);
    cone.userData = { basePos: cone.position.clone(), floatAmp: 2.5, floatSpeed: 0.4, rotSpeed: { x: 0.005, y: 0.007, z: 0.003 } };
    scene.add(cone); objects.push(cone);

    // 9. Dodecahedron
    const dodecGeo = new THREE.DodecahedronGeometry(1, 0);
    const dodec = new THREE.Mesh(dodecGeo, glassMat.clone());
    dodec.material.opacity = 0.1;
    dodec.add(new THREE.LineSegments(new THREE.EdgesGeometry(dodecGeo), new THREE.LineBasicMaterial({ color: 0x22d3ee, transparent: true, opacity: 0.3 })));
    dodec.position.set(0, 10, -8);
    dodec.userData = { basePos: dodec.position.clone(), floatAmp: 2, floatSpeed: 0.5, rotSpeed: { x: 0.007, y: 0.005, z: 0.009 } };
    scene.add(dodec); objects.push(dodec);

    // 10. Small wireframe sphere
    const sphere = new THREE.Mesh(new THREE.SphereGeometry(1, 12, 12), wireMat.clone());
    sphere.material.opacity = 0.15;
    sphere.position.set(-4, -10, -6);
    sphere.userData = { basePos: sphere.position.clone(), floatAmp: 1.8, floatSpeed: 0.6, rotSpeed: { x: 0.008, y: 0.006, z: 0.004 } };
    scene.add(sphere); objects.push(sphere);

    // 11. Tiny floating cubes cluster
    for (let i = 0; i < 8; i++) {
        const tinyMat = new THREE.MeshPhongMaterial({
            color: i % 2 === 0 ? 0x06b6d4 : 0x0d9488,
            wireframe: true, transparent: true, opacity: 0.2
        });
        const tiny = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.4, 0.4), tinyMat);
        const angle = (i / 8) * Math.PI * 2;
        const radius = 18 + Math.random() * 5;
        tiny.position.set(
            Math.cos(angle) * radius,
            (Math.random() - 0.5) * 20,
            -10 - Math.random() * 10
        );
        tiny.userData = {
            basePos: tiny.position.clone(),
            floatAmp: 1 + Math.random() * 2,
            floatSpeed: 0.3 + Math.random() * 0.4,
            rotSpeed: { x: 0.01 + Math.random() * 0.02, y: 0.01 + Math.random() * 0.02, z: 0.005 }
        };
        scene.add(tiny); objects.push(tiny);
    }

    // Particle stars
    const starsGeo = new THREE.BufferGeometry();
    const starsCount = 400;
    const starPositions = new Float32Array(starsCount * 3);
    for (let i = 0; i < starsCount * 3; i++) {
        starPositions[i] = (Math.random() - 0.5) * 120;
    }
    starsGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const stars = new THREE.Points(starsGeo, new THREE.PointsMaterial({ color: 0x06b6d4, size: 0.08, transparent: true, opacity: 0.6 }));
    scene.add(stars);

    // Mouse tracking
    let mouseX = 0, mouseY = 0;
    let targetMouseX = 0, targetMouseY = 0;

    window.addEventListener('mousemove', (e) => {
        targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    // Surge config - dramatic zoom in/out
    objects.forEach((obj, i) => {
        const d = obj.userData;
        d.surgeCycle = 8 + Math.random() * 6;
        d.surgeOffset = i * 1.7 + Math.random() * 2;
        d.surgeDepth = 30 + Math.random() * 10;
        d.surgeScale = 1.8 + Math.random() * 2;
        d.surgeRotBoost = 4 + Math.random() * 4;
    });

    // Store base opacity
    objects.forEach(obj => {
        if (obj.material) {
            obj.material.userData = { baseOpacity: obj.material.opacity };
        }
    });

    // Animation loop
    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);
        const time = clock.getElapsedTime();

        // Smooth mouse
        mouseX += (targetMouseX - mouseX) * 0.05;
        mouseY += (targetMouseY - mouseY) * 0.05;

        // Camera react to mouse
        camera.position.x = mouseX * 3;
        camera.position.y = -mouseY * 2;
        camera.lookAt(0, 0, -5);

        // Animate objects with dramatic zoom surge
        objects.forEach(obj => {
            const d = obj.userData;

            // === SURGE CALCULATION ===
            const cycleTime = ((time + d.surgeOffset) % d.surgeCycle) / d.surgeCycle;

            // Surge envelope: calm → RUSH IN → PULL BACK → calm
            let surge = 0;
            let surgeScale = 1;

            if (cycleTime > 0.35 && cycleTime <= 0.5) {
                // Rush IN
                const t = (cycleTime - 0.35) / 0.15;
                surge = t * t * (3 - 2 * t); // smoothstep
                surgeScale = 1 + (d.surgeScale - 1) * surge;
            } else if (cycleTime > 0.5 && cycleTime <= 0.68) {
                // Pull BACK
                const t = 1 - (cycleTime - 0.5) / 0.18;
                surge = t * t;
                surgeScale = 1 + (d.surgeScale - 1) * surge;
            }

            // Rotation - faster during surge
            const rotMul = 1 + surge * d.surgeRotBoost;
            obj.rotation.x += d.rotSpeed.x * rotMul;
            obj.rotation.y += d.rotSpeed.y * rotMul;
            obj.rotation.z += d.rotSpeed.z * rotMul;

            // Float + Surge position
            const floatY = Math.sin(time * d.floatSpeed) * d.floatAmp;
            const baseZ = Math.sin(time * d.floatSpeed * 0.7 + 1) * (d.floatAmp * 0.8);
            const surgeZ = surge * d.surgeDepth;
            const baseX = Math.sin(time * d.floatSpeed * 0.5 + 2) * (d.floatAmp * 0.4);
            const surgeCenterX = -d.basePos.x * surge * 0.7;

            obj.position.x = d.basePos.x + baseX + surgeCenterX;
            obj.position.y = d.basePos.y + floatY * (1 - surge * 0.5);
            obj.position.z = d.basePos.z + baseZ + surgeZ;

            // Scale up during surge
            obj.scale.setScalar(surgeScale);

            // Opacity boost during surge
            if (obj.material && obj.material.userData) {
                obj.material.opacity = (obj.material.userData.baseOpacity || 0.15) + surge * 0.2;
            }
        });

        // Rotate stars slowly
        stars.rotation.y = time * 0.01;
        stars.rotation.x = time * 0.005;

        // Pulse lights
        pointLight1.intensity = 1.5 + Math.sin(time * 0.8) * 0.5;
        pointLight2.intensity = 0.8 + Math.sin(time * 0.6 + 1) * 0.3;

        renderer.render(scene, camera);
    }

    animate();

    // Resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
})();
