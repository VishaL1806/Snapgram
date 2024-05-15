import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignInFormValidation } from "@/lib/validation";
import { z } from "zod";
import Loader from "@/components/shared/Loader";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast"
import { useSignInAccountMutation } from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";


const SignIn = () => {

  const {toast} = useToast()

  const navigate = useNavigate();

  const {checkAuthUser } = useUserContext()
  

  const {mutateAsync : signInAccount, isPending : isSigningIn} = useSignInAccountMutation();
  // 1. Define your form.
  const form = useForm<z.infer<typeof SignInFormValidation>>({
    resolver: zodResolver(SignInFormValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof SignInFormValidation>) {

   const session = await signInAccount({
    email : values.email,
    password : values.password
   })

   if(!session)
    {
      return toast({
        variant : "destructive",
        title: "Sign In Failed!!! Try Again",
      });
    }

    const isLoggedIn = await checkAuthUser()

    if(isLoggedIn)
    {
      form.reset()
      navigate("/")
    }else{
      return toast({
        variant : "destructive",
        title: "Sign up Failed!!! Try Again",
      });
    }
    
  }
  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <img src="/assets/images/logo.svg" alt="" />

        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
          Log In to your account
        </h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          Welcome Back!! Please enter your details.
        </p>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-full mt-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" className="shad-input" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="shad-button_primary">
            {isSigningIn ? (
              <div className="flex-center gap-2">Loading.. <Loader /> </div>
            ) : (
              "Sign In"
            )}
          </Button>
          <p className="text-small-regular text-light-2 text-center mt-2">
            Don't have an account? <Link className="text-primary-500 text-small-semibold ml-1" to={"/sign-up"} >Sign Up</Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SignIn;
