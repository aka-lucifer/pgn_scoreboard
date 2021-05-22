export function DrawText3D(position: { x: number, y: number, z: number }, scale: number, text: string, color: { r: number, g: number, b: number, a: number }): void {
  const p = GetGameplayCamCoords();
  const dist = GetDistanceBetweenCoords(p[0], p[1], p[2], position.x, position.y, position.z, true);
  let s = (1 / dist) * 20;
  const fov = (1 / GetGameplayCamFov()) * 100;
  s = s * fov;
  SetTextScale(scale * s, scale * s);
  SetTextFont(2);
  SetTextProportional(true);
  SetTextColour(color.r, color.g, color.b, color.a);
  SetTextDropshadow(1, 1, 1, 1, 255);
  SetTextDropShadow();
  SetTextOutline();
  SetTextEntry("STRING");
  SetTextCentre(true);
  AddTextComponentString(text);
  SetDrawOrigin(position.x, position.y, position.z, 0);
  DrawText(0.0, 0.0);
  ClearDrawOrigin();
}