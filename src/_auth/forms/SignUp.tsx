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
import { SignUpFormValidation } from "@/lib/validation";
import { z } from "zod";
import Loader from "@/components/shared/Loader";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast"
import { useCreateUserAccountMutation, useSignInAccountMutation } from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";


const SignUp = () => {

  const {toast} = useToast()

  const navigate = useNavigate();

  const {checkAuthUser } = useUserContext()
  
  const {mutateAsync : createUserAccount, isPending : isCreatingAccount} = useCreateUserAccountMutation();

  const {mutateAsync : signInAccount } = useSignInAccountMutation();
  // 1. Define your form.
  const form = useForm<z.infer<typeof SignUpFormValidation>>({
    resolver: zodResolver(SignUpFormValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof SignUpFormValidation>) {

    const newUser = await createUserAccount(values)
  
    if(!newUser)
    {
      return toast({
        variant : "destructive",
        title: "Sign up Failed!!! Try Again",
      });
    }
      
   const session = await signInAccount({
    email : values.email,
    password : values.password
   })

   if(!session)
    {
      return toast({
        variant : "destructive",
        title: "Sign In Failed!!! Try Again {{session}}",
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
        title: "Sign up Failed!!! Try Again {{checkAuth}}",
      });
    }
    
  }
  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <img src="/assets/images/logo.svg" alt="" />

        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
          Create a New Account
        </h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          To use snapgram enter your details.
        </p>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-full mt-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
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
            {isCreatingAccount ? (
              <div className="flex-center gap-2">Loading.. <Loader /> </div>
            ) : (
              "Sign Up"
            )}
          </Button>
          <p className="text-small-regular text-light-2 text-center mt-2">
            Already have an account? <Link className="text-primary-500 text-small-semibold ml-1" to={"/sign-in"} >Sign In</Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SignUp;
