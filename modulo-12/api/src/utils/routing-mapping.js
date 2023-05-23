function mapRoutes(instance, methods) {
    return methods.map(method => instance[method]());
}

export default mapRoutes;