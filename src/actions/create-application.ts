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
    submission_city?: string[];
    additional_info?: string[];
  };
}

export async function createApplication(
  formState: CreateApplicationFormState,
  formData: FormData
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
  const submission_city = formData.get('submission_city') as string | null;
  const additional_info = formData.get('additional_info') as string | null;
  const status = formData.get('status') as string;

  console.log(formData);
  
  try {
    await db.application.create({
      data: {
        application_date,
        biometric_date,
        submission_city,
        additional_info,
        user_id: session.user.id, 
        status: status,
      },
    });
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
