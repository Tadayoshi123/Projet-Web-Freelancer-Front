import { useRouter } from 'next/router';
import Link from "next/link";
import Title from '@/components/UI/Title';
import Loading from "@/components/UI/Loading";
import ChoiceCard from "@/components/UI/ChoiceCard";
import CompanyImage from '../../../../public/images/company.png';
import FreelanceImage from '../../../../public/images/freelancer.png';

const Index = () => {

  const router = useRouter();

  return (
    <>
      <Title title="Which account type would you like to start with  ?" Level="h1" />
        <ChoiceCard
            image={CompanyImage.src}
            title="Company"
            text="I'm looking for freelancers"
            handleClick={() => router.push('/auth/register/company')}
        />
        <ChoiceCard
            image={FreelanceImage.src}
            title="Freelance"
            text="I'm looking for a job"
            handleClick={() => router.push('/auth/register/freelance')}
        />
      <p>
        Already have an account ? <Link href="/auth/login">Sign in now</Link>
      </p>
    </>
  );
}

export default Index;