
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Mvc.ViewEngines;
using Microsoft.AspNetCore.Mvc.ViewFeatures;

namespace SchoolApiApplication.Extensions
{
public static class ViewRenderer
    {
        public static async Task<string> RenderViewToStringAsync(this ControllerBase controller, string viewName, object model,ITempDataDictionary tempData)
        {
            var httpContext = new DefaultHttpContext { RequestServices = controller.HttpContext.RequestServices };
            var actionContext = new ActionContext(httpContext, new Microsoft.AspNetCore.Routing.RouteData(), controller.ControllerContext.ActionDescriptor);

            var viewEngine = controller.HttpContext.RequestServices.GetService(typeof(ICompositeViewEngine)) as ICompositeViewEngine;
            var viewResult = viewEngine.FindView(controller.ControllerContext, viewName, false);

            if (viewResult.View == null)
            {
                throw new ArgumentNullException($"{viewName} does not match any available view");
            }

            var viewData = new ViewDataDictionary(new EmptyModelMetadataProvider(), controller.ModelState)
            {
                Model = model
            };

          
            using (var writer = new StringWriter())
            {
                var viewContext = new ViewContext(
                    actionContext,
                    viewResult.View,
                    viewData,
                    tempData,
                    writer,
                    new HtmlHelperOptions()
                );

                await viewResult.View.RenderAsync(viewContext);

                return writer.ToString();
            }
        }
    

}


}
