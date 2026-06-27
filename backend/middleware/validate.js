export const validate = (zodSchema)=>{
    return (req,res,next)=>{
        const result = zodSchema.safeParse(req.body);
        if(!result.success){
            return res.json({
                message : "validation has failed miserably"

            })
        }
        
        next();
    }

}
