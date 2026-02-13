import { PhotoGallery } from "@/components/photo-gallery"
import { PageWrapper } from "@/components/page-wrapper"

export const metadata = {
  title: "ความทรงจำของเรา | Valentine's Day",
}

export default function GalleryPage() {
  return (
    <PageWrapper>
      <PhotoGallery />
    </PageWrapper>
  )
}
