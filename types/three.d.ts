export type GLTFResult = GLTF & {
  nodes: {
    Chassis_1: THREE.Mesh;
    Chassis_2: THREE.Mesh;
  };
  materials: {
    BodyPaint: THREE.MeshStandardMaterial;
    BodyPaint_Accent: THREE.MeshStandardMaterial;
  };
};
