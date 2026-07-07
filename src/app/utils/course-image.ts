/** TalentLMS serves course avatars at ~240×160px — upscaling looks pixelated. */
const TALENT_LMS_IMAGE_HOST = /d3j0t7vrtr92dk\.cloudfront\.net/i;

export const TALENT_LMS_IMAGE_WIDTH = 240;
export const TALENT_LMS_IMAGE_HEIGHT = 160;

export function isTalentLmsCourseImage(url: string | undefined): boolean {
  return Boolean(url && TALENT_LMS_IMAGE_HOST.test(url));
}
