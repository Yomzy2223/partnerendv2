import Image from "next/image"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { kyc } from "@/assets/icons"
import { PartnerKYCModal } from "../profile/PartnerKYCModal"
import { Button } from "flowbite-react"
import { useState } from "react"
import { useGlobalFunctions } from "@/hooks/globalFunctions"
import { usePathname } from "next/navigation";
export default function AlertDemo() {
    const [openModal, setOpenModal] = useState(false);

    const closeModal = () => {
        setOpenModal(false);
    };
    const { isDesktop } = useGlobalFunctions();

    const pathname = usePathname();
    const isHome = pathname === "/"
    return (
        <div className="mr-8">
            { isHome && (
                    <>
                         {isDesktop ? (
                                <div className="border rounded-md border-none bg-[#FDF2F2] m-2 p-3.5">
                                    <span className="inline-flex items-center space-x-2 font-bold text-magenta">
                                        <Image src={kyc} alt="" className="w-4 h-4" />
                                        <h2 >KYC</h2>
                                    </span>
                    
                                    
                                    <div className="font-bold">
                                        <span className="text-sm text-magenta">It is essential that you fill your documents before proceeding. </span>
                                        <Button size="fit" color="ghost" className="w-max" onClick={() => setOpenModal(true)}>
                                            <span className="text-sm mr-2 text-primary">click here to upload</span>{" "}
                                        </Button> 
                                    </div>
                                
                                </div>
                            ) : (
                                <Button size="fit" color="ghost" className="w-max" onClick={() => setOpenModal(true)}>
                                    <Image src={kyc} alt="" className="w-4 h-4" />
                                    <span className="text-sm mr-2 text-magenta">Complete KYC</span>{" "}
                                </Button> 
                        )}
                    </>
                )
            }
            <PartnerKYCModal open={openModal} close={closeModal}/>
        </div>
        
    )
}
