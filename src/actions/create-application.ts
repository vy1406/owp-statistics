'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { db } from '@/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

interface CreateApplicationFormState {
  errors: {
    _form?: string[];
    application_date?: string[];
    biometric_date?: string[];
    decision_date?: string[];
    submission_city?: string[];
    additional_info?: string[];
    is_self_submitted?: string[];
  };
}

export async function createApplication(
  formState: CreateApplicationFormState,
  formData: FormData,
  onSuccess: () => void
): Promise<CreateApplicationFormState> {
  const session: any = await getServerSession(authOptions as any);

  if (!session || !session.user) {
    return {
      errors: {
        _form: ['You must be signed in to do this.'],
      },
    };
  }

  const application_date = formData.get('application_date') as string
  const biometric_date = formData.get('biometric_date') as string | null;
  const decision_date = formData.get('decision_date') as string | null;
  const submission_city = formData.get('submission_city') as string | null;
  const additional_info = formData.get('additional_info') as string | null;
  const is_self_submitted = formData.get('is_self_submitted') as string || false;
  const status = formData.get('status') as string;

  const calculateStatus = () => {
    if ( decision_date) {
      return 'Approved';
    } else { 
      return status
    }
  }

  try {
    await db.application.create({
      data: {
        application_date,
        decision_date,
        biometric_date,
        submission_city,
        is_self_submitted: is_self_submitted === "true" ? true : false,
        additional_info,
        user_id: session.user.id, 
        status: calculateStatus(),
      },
    });
    onSuccess()
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        errors: {
          _form: [err.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ['Something went wrong'],
        },
      };
    }
  }
  
  revalidatePath('/application');
  redirect('/application');

}
