export type Section = "exterior" | "interior";
export type View = { id: string; label: string; url: string };
export type Model = {
  id: string;
  name: string;
  exterior: View[];
  interior?: View[];
  defaultExteriorId: string;
  defaultInteriorId?: string;
};

// Shared helper to inject Cloudinary transforms
export const cloudinaryWithTransform = (url: string, transform: string) => {
  try {
    const marker = "/upload/";
    const idx = url.indexOf(marker);
    if (idx === -1) return url;
    const before = url.slice(0, idx + marker.length);
    const after = url.slice(idx + marker.length);
    if (after.startsWith(transform + "/") || after.startsWith(transform + ",")) {
      return url;
    }
    return `${before}${transform}/${after}`;
  } catch {
    return url;
  }
};

export const MODELS: Model[] = [
  {
    id: "chiron",
    name: "Bugatti Chiron",
    exterior: [
      { id: "cover", label: "Cover", url: "https://res.cloudinary.com/dfnpgl0bb/image/upload/v1762427317/chiron_cover_image_fnu6bm.png" },
      { id: "front", label: "Front", url: "https://res.cloudinary.com/dfnpgl0bb/image/upload/v1762426430/chiron_front_view_hqjywl.png" },
      { id: "front-left", label: "Front Left", url: "https://res.cloudinary.com/dfnpgl0bb/image/upload/v1762426431/chiron_front_left_view_o4jrou.png" },
      { id: "left", label: "Left Side", url: "https://res.cloudinary.com/dfnpgl0bb/image/upload/v1762426431/chiron_left_side_view_ej8ms8.png" },
      { id: "rear-left", label: "Rear Left", url: "https://res.cloudinary.com/dfnpgl0bb/image/upload/v1762426439/chiron_rear_left_view_ddw6nd.png" },
      { id: "rear-right", label: "Rear Right", url: "https://res.cloudinary.com/dfnpgl0bb/image/upload/v1762426430/chiron_rear_right_view_pnmkfw.png" },
      { id: "rear", label: "Rear", url: "https://res.cloudinary.com/dfnpgl0bb/image/upload/v1762426430/chiron_rear_view_mm2tmx.png" },
      { id: "top", label: "Top", url: "https://res.cloudinary.com/dfnpgl0bb/image/upload/v1762426429/chiron_top_view_mig9sy.png" },
    ],
    interior: [
      { id: "interior-1", label: "Interior 1", url: "https://res.cloudinary.com/dfnpgl0bb/image/upload/v1762428154/chiron_interior_1_tuzwto.avif" },
      { id: "interior-2", label: "Interior 2", url: "https://res.cloudinary.com/dfnpgl0bb/image/upload/v1762428153/chiron_interior_2_pwr5gq.avif" },
      { id: "interior-3", label: "Interior 3", url: "https://res.cloudinary.com/dfnpgl0bb/image/upload/v1762428154/chiron_interior_3_lpqzb7.avif" },
      { id: "interior-4", label: "Interior 4", url: "https://res.cloudinary.com/dfnpgl0bb/image/upload/v1762428192/chiron_interior_4_dnzmbs.avif" },
    ],
    defaultExteriorId: "cover",
    defaultInteriorId: "interior-1",
  },
  {
    id: "divo",
    name: "Bugatti Divo",
    exterior: [
      { id: "cover", label: "Cover", url: "https://res.cloudinary.com/dfnpgl0bb/image/upload/v1762429232/Divo_cover_image-166_aqt9bm.avif" },
      { id: "front-right", label: "Front Right", url: "https://res.cloudinary.com/dfnpgl0bb/image/upload/v1762429231/Divo_front-right-view-120_wcgdfw.avif" },
      { id: "rear-left", label: "Rear Left", url: "https://res.cloudinary.com/dfnpgl0bb/image/upload/v1762429238/Divo_rear-left-view-121_nmyuxb.avif" },
      { id: "rear", label: "Rear", url: "https://res.cloudinary.com/dfnpgl0bb/image/upload/v1762429238/Divo_rear-view-119_czrps6.avif" },
      { id: "rear-right", label: "Rear Right", url: "https://res.cloudinary.com/dfnpgl0bb/image/upload/v1762429232/Divo_rear-right-side-48_vwutcr.avif" },
      { id: "top", label: "Top", url: "https://res.cloudinary.com/dfnpgl0bb/image/upload/v1762429232/Divo_top-view-117_qrfzi3.avif" },
      { id: "grille", label: "Grille", url: "https://res.cloudinary.com/dfnpgl0bb/image/upload/v1762429231/Divo_grille-97_el34p2.avif" },
    ],
    interior: [
      { id: "interior-1", label: "Interior 1", url: "https://res.cloudinary.com/dfnpgl0bb/image/upload/v1762429230/Divo_interior_1_i25xsy.avif" },
      { id: "interior-2", label: "Interior 2", url: "https://res.cloudinary.com/dfnpgl0bb/image/upload/v1762429230/Divo_interior_2_irsljo.avif" },
      { id: "interior-3", label: "Interior 3", url: "https://res.cloudinary.com/dfnpgl0bb/image/upload/v1762429231/Divo_interior_3_zfgbbj.avif" },
      { id: "interior-4", label: "Interior 4", url: "https://res.cloudinary.com/dfnpgl0bb/image/upload/v1762429230/Divo_interior_4_ldhlh6.avif" },
      { id: "interior-5", label: "Interior 5", url: "https://res.cloudinary.com/dfnpgl0bb/image/upload/v1762429230/Divo_interior_5_wkpmtx.avif" },
    ],
    defaultExteriorId: "cover",
    defaultInteriorId: "interior-1",
  },
];
