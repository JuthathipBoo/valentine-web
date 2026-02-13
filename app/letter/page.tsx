import { LoveLetter } from "@/components/love-letter"
import { PageWrapper } from "@/components/page-wrapper"

export const metadata = {
  title: "จดหมายรัก | Valentine's Day",
}

export default function LetterPage() {
  return (
    <PageWrapper>
      <LoveLetter />
    </PageWrapper>
  )
}
