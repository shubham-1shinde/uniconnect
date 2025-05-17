import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import authService from "../../appwrite/auth";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "../CSS/addpost.css"

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const submit = async (data) => {
        if (post) {
            const file = data.image && data.image.length > 0 ? await appwriteService.uploadFile(data.image[0]) : null;

            if (file && post.featuredImage) {
                await appwriteService.deleteFile(post.featuredImage);
            }

            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : post.featuredImage,
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            const file = data.image && data.image.length > 0 ? await appwriteService.uploadFile(data.image[0]) : null;
            if(file){
                data.featuredImage = file.$id;
            }
            const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });
            console.log("userdata :",userData);
            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <div className="main flex flex-col justify-center items-center bg-purple-500">
        <form onSubmit={handleSubmit(submit)}>
            <div className="sub1 bg-purple-200 mt-8 mb-8 rounded-lg p-4">
                <div>
                    <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                    />
                </div>
                <div className="hidden">
                    <Input
                        label="Slug :"
                        placeholder="Slug"
                        className="mb-4"
                        {...register("slug", { required: true })}
                        onInput={(e) => {
                            setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                        }}
                    />
                </div>
                <div><RTE  label="Content :" name="content" control={control} defaultValue={getValues("content")} /></div>
                <div className="mt-4">
                    <Button type="submit" onClick={() => console.log("clicked")} bgColor={post ? "bg-green-500" : undefined} className="w-full">
                        {post ? "Update" : "Submit"}
                    </Button>
                </div>
            </div>
            <div className="w-1/3 px-2 ">
                <div className="">
                    <Input
                        label="Featured Image :"
                        type="file"
                        className="mb-4"
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        {...register("image", {})}
                    />
                </div>
                {post && (
                    <div className="w-full mb-4">
                        {post.featuredImage ? (
                            <img
                                src={appwriteService.getFilePreview(post.featuredImage)}
                                alt={post.title}
                                className="rounded-lg"
                            />
                        ) : (
                            <div className="text-gray-500">No featured image available</div>
                        )}
                    </div>
                )}
                
            </div>
        </form>
        </div>
    );
}
